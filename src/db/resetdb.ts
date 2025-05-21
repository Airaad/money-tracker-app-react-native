import * as FileSystem from 'expo-file-system';

export const deleteDatabase = async () => {
  const dbPath = FileSystem.documentDirectory + 'app.db'; // name must match your openDatabase()
  const dbInfo = await FileSystem.getInfoAsync(dbPath);

  if (dbInfo.exists) {
    console.log('Deleting old database...');
    await FileSystem.deleteAsync(dbPath, { idempotent: true });
    console.log('Database deleted');
  } else {
    console.log('No existing database found');
  }
};

// Call this before initializing Drizzle or calling useMigrations
// await deleteDatabase();
