export interface Retailer {
  id: number;
  name: string;
  country: string;
  city: string;
  date: string;
  storesCount: number;
  status: "Active" | "Inactive" | "Pending";
}

export const retailers: Retailer[] = [
  { id: 1, name: "Carrefour", country: "France", city: "Paris", date: "2023-01-15", storesCount: 1200, status: "Active" },
  { id: 2, name: "Walmart", country: "USA", city: "Bentonville", date: "2022-11-03", storesCount: 4700, status: "Active" },
  { id: 3, name: "Tesco", country: "UK", city: "London", date: "2023-03-22", storesCount: 2700, status: "Active" },
  { id: 4, name: "Lidl", country: "Germany", city: "Berlin", date: "2022-08-10", storesCount: 3200, status: "Active" },
  { id: 5, name: "Auchan", country: "France", city: "Lille", date: "2023-05-01", storesCount: 850, status: "Inactive" },
  { id: 6, name: "Migros", country: "Switzerland", city: "Zurich", date: "2023-02-18", storesCount: 600, status: "Active" },
  { id: 7, name: "Coop", country: "Switzerland", city: "Basel", date: "2022-12-09", storesCount: 540, status: "Pending" },
  { id: 8, name: "Aldi", country: "Germany", city: "Essen", date: "2023-04-14", storesCount: 5000, status: "Active" },
  { id: 9, name: "Costco", country: "USA", city: "Issaquah", date: "2022-09-27", storesCount: 850, status: "Active" },
  { id: 10, name: "Metro", country: "Germany", city: "Düsseldorf", date: "2023-06-30", storesCount: 670, status: "Inactive" },
  { id: 11, name: "Pingo Doce", country: "Portugal", city: "Lisbon", date: "2023-01-09", storesCount: 430, status: "Active" },
  { id: 12, name: "Mercadona", country: "Spain", city: "Valencia", date: "2022-10-21", storesCount: 1630, status: "Active" },
  { id: 13, name: "SHOP&GO", country: "Armenia", city: "Yerevan", date: "2023-03-03", storesCount: 120, status: "Pending" },
  { id: 14, name: "Carrefour Express", country: "Italy", city: "Milan", date: "2022-07-17", storesCount: 980, status: "Active" },
  { id: 15, name: "Jumbo", country: "Netherlands", city: "Amsterdam", date: "2023-05-25", storesCount: 700, status: "Active" },
];
