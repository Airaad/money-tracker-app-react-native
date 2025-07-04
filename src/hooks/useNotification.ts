import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { useToast } from "./useToast";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export function useNotification() {
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const { showToast } = useToast();

  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      return false;
    }
    return true;
  };

  useEffect(() => {
    // Create a custom notification channel on Android
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("budget-alerts", {
        name: "Budget Alerts",
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
        sound: "default",
      });
    }

    const checkForPermission = async () => {
      try {
        const permissionGranted = await requestPermissions();
        if (permissionGranted) {

          (async () => {
            const stored = await AsyncStorage.getItem("remindersEnabled");
            const enabled = stored === "true";
            setReminderEnabled(enabled);
            if (enabled) {
              triggerLocalNotification();
            }
          })();
          
        } else {
          setReminderEnabled(false);
          await cancelAllReminders();
          await AsyncStorage.removeItem("remindersEnabled");
        }
      } catch (err) {
        showToast({
          type: "error",
          text1: "Failed to set item",
          text2: err instanceof Error ? err.message : "Something went wrong.",
        });
      }
    };
    checkForPermission();
    // (async () => {
    //   try {
    //     const stored = await AsyncStorage.getItem("remindersEnabled");
    //     const enabled = stored === "true";
    //     setReminderEnabled(enabled);
    //     if (enabled) {
    //       triggerLocalNotification();
    //     }
    //   } catch (error) {
    //     throw new Error("Something went wrong");
    //   }
    // })();
  }, []);

  const triggerLocalNotification = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync(); // To avoid duplicates. This will ensure only two notifications are set

    const times = [
      { hour: 10, minute: 0 },
      { hour: 21, minute: 0 },
    ];

    for (const time of times) {
      // Will shedule the notification for two specified time in times array.
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Add Daily Expenses 🪙",
          body: "Don't forget to add today's expenses.",
          data: { type: "expense-reminder" },
          sound: "default",
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: time.hour,
          minute: time.minute,
          channelId: "budget-alerts", // Required on Android to match the created channel
        },
      });
    }
  };

  const cancelAllReminders = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  const toggleReminders = async (enabled: boolean) => {
    setReminderEnabled(enabled);
    try {
      await AsyncStorage.setItem("remindersEnabled", enabled.toString());
      if (enabled) {
        const permissionGranted = await requestPermissions();
        if (permissionGranted) {
          await triggerLocalNotification();
          showToast({
            type: "success",
            text1: "Reminder set successfully !",
          });
        } else {
          alert("You need to enable notifications for this feature");
          setReminderEnabled(false);
          await cancelAllReminders();
        }
      } else {
        await cancelAllReminders();
      }
    } catch (err) {
      showToast({
        type: "error",
        text1: "Failed to set Reminder",
        text2: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  };

  return { reminderEnabled, toggleReminders };
}
