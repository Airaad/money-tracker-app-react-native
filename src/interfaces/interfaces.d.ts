interface ExpenseItem {
  id: number;
  category: string;
  icon: string;
  amount: string;
  description: string;
}

interface Items {
  id: number;
  createdDate: string;
  item: ExpenseItem[];
}

interface CategoryItems {
  label: string;
  value: {
    title: string;
    icon: string;
    color: string;
    bgColor: string;
  };
}

interface AnalyticsDataItem {
  id: number;
  name: string;
  amount: number;
  color: string;
  bgColor: string;
  icon: string;
  legendFontColor: string;
  legendFontSize: number;
}

interface CurrencyOptions {
  label: string;
  value: string;
}
