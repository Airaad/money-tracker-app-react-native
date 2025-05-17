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
  item: ExpenseItem[]
}

interface CategoryItems {
  label: string;
  value: string;
}
