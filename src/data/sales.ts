export interface Sale {
  id: number;
  product: string;
  retailer: string;
  brand: string;
  amount: number;
  quantity: number;
  date: string;
  region: string;
}

export const sales: Sale[] = [
  { id: 1, product: "Sneaker X1", retailer: "Walmart", brand: "Nike", amount: 12500, quantity: 250, date: "2026-01-12", region: "North America" },
  { id: 2, product: "Hoodie Classic", retailer: "Tesco", brand: "Adidas", amount: 8900, quantity: 180, date: "2026-01-15", region: "Europe" },
  { id: 3, product: "Running Shorts", retailer: "Carrefour", brand: "Puma", amount: 4300, quantity: 120, date: "2026-02-01", region: "Europe" },
  { id: 4, product: "Sneaker X1", retailer: "Costco", brand: "Nike", amount: 15600, quantity: 310, date: "2026-02-08", region: "North America" },
  { id: 5, product: "Track Jacket", retailer: "Lidl", brand: "Adidas", amount: 6700, quantity: 140, date: "2026-02-19", region: "Europe" },
  { id: 6, product: "Yoga Pants", retailer: "Mercadona", brand: "Lululemon", amount: 9200, quantity: 200, date: "2026-03-02", region: "Europe" },
  { id: 7, product: "Cap Logo", retailer: "Aldi", brand: "Puma", amount: 2100, quantity: 350, date: "2026-03-11", region: "Europe" },
  { id: 8, product: "Sneaker X2", retailer: "SHOP&GO", brand: "Nike", amount: 3400, quantity: 65, date: "2026-03-20", region: "Asia" },
  { id: 9, product: "Backpack Pro", retailer: "Migros", brand: "The North Face", amount: 7800, quantity: 95, date: "2026-04-05", region: "Europe" },
  { id: 10, product: "Hoodie Classic", retailer: "Pingo Doce", brand: "Adidas", amount: 5400, quantity: 110, date: "2026-04-18", region: "Europe" },
  { id: 11, product: "Running Shorts", retailer: "Jumbo", brand: "Puma", amount: 3900, quantity: 88, date: "2026-05-02", region: "Europe" },
  { id: 12, product: "Sneaker X1", retailer: "Metro", brand: "Nike", amount: 11200, quantity: 220, date: "2026-05-14", region: "Europe" },
];
