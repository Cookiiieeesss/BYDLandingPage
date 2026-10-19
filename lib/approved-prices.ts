// Approved Jakarta OTR reference prices; dealer Tangerang pricing may differ.
export const approvedVehiclePrices: Record<string, { name: string; price: number }[]> = {
  m6: [
    { name: "Standard 7-Seater", price: 395000000 },
    { name: "Superior 7-Seater", price: 435000000 },
    { name: "Superior Captain 6-Seater", price: 445000000 },
  ],
  "atto-1": [
    { name: "Standard Standard Range", price: 199000000 },
    { name: "Dynamic Standard Range", price: 210000000 },
    { name: "Premium Long Range", price: 245000000 },
  ],
};
export const formatIdr = (price: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price);
