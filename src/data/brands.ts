export interface Brand {
  id: number;
  name: string;
  category: string;
  country: string;
  founded: number;
  date: string;
  partnersCount: number;
  status: "Active" | "Inactive" | "Pending";
}

export const brands: Brand[] = [
  { id: 1, name: "Nike", category: "Sportswear", country: "USA", founded: 1964, date: "2021-04-12", partnersCount: 45, status: "Active" },
  { id: 2, name: "Adidas", category: "Sportswear", country: "Germany", founded: 1949, date: "2021-06-08", partnersCount: 38, status: "Active" },
  { id: 3, name: "Puma", category: "Sportswear", country: "Germany", founded: 1948, date: "2022-01-20", partnersCount: 29, status: "Active" },
  { id: 4, name: "Lululemon", category: "Activewear", country: "Canada", founded: 1998, date: "2022-03-15", partnersCount: 15, status: "Active" },
  { id: 5, name: "The North Face", category: "Outdoor", country: "USA", founded: 1968, date: "2022-05-30", partnersCount: 22, status: "Pending" },
  { id: 6, name: "Under Armour", category: "Sportswear", country: "USA", founded: 1996, date: "2022-08-09", partnersCount: 18, status: "Inactive" },
  { id: 7, name: "Reebok", category: "Sportswear", country: "USA", founded: 1958, date: "2023-01-11", partnersCount: 12, status: "Active" },
  { id: 8, name: "New Balance", category: "Footwear", country: "USA", founded: 1906, date: "2023-02-25", partnersCount: 20, status: "Active" },
  { id: 9, name: "Patagonia", category: "Outdoor", country: "USA", founded: 1973, date: "2023-04-03", partnersCount: 9, status: "Pending" },
  { id: 10, name: "Columbia", category: "Outdoor", country: "USA", founded: 1938, date: "2023-05-19", partnersCount: 14, status: "Active" }, { id: 1, name: "Nike", category: "Sportswear", country: "USA", founded: 1964, date: "2021-04-12", partnersCount: 45, status: "Active" },
  { id: 11, name: "Hugo", category: "Sportswear", country: "Germany", founded: 1949, date: "2021-06-08", partnersCount: 38, status: "Active" },
  { id: 12, name: "Sport Goods", category: "Sportswear", country: "Germany", founded: 1948, date: "2022-01-20", partnersCount: 29, status: "Active" },
  { id: 13, name: "XXlemon", category: "Activewear", country: "Canada", founded: 1998, date: "2022-03-15", partnersCount: 15, status: "Active" },
  { id: 14, name: " Other North Face", category: "Outdoor", country: "USA", founded: 1968, date: "2022-05-30", partnersCount: 22, status: "Pending" },
  { id: 15, name: "Armour", category: "Sportswear", country: "USA", founded: 1996, date: "2022-08-09", partnersCount: 18, status: "Inactive" },
  { id: 16, name: "Sport Reebok", category: "Sportswear", country: "USA", founded: 1958, date: "2023-01-11", partnersCount: 12, status: "Active" },
  { id: 17, name: "Old Balance", category: "Footwear", country: "USA", founded: 1906, date: "2023-02-25", partnersCount: 20, status: "Active" },
  { id: 18, name: "YYY Patagonia", category: "Outdoor", country: "USA", founded: 1973, date: "2023-04-03", partnersCount: 9, status: "Pending" },
  { id: 19, name: "New Columbia", category: "Outdoor", country: "USA", founded: 1938, date: "2023-05-19", partnersCount: 14, status: "Active" },
];
