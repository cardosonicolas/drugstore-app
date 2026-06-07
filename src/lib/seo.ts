export const SITE = {
  url: "https://drugstore-elparacao.com.ar",
  name: "Drugstore El Paracao",
  shortName: "El Paracao",
  tagline: "Tu drugstore a domicilio en Paraná",
  description:
    "Drugstore en Paraná, Entre Ríos. Delivery de bebidas, snacks, chocolates, cigarrillos y despensa. Atendemos de 9:00 a 04:00 todos los días. Pedí por WhatsApp.",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  hours: { open: "09:00", close: "04:00" },
  cities: [
    "Paraná",
    "Oro Verde",
    "San Benito",
    "Colonia Avellaneda",
    "Sauce Montrull",
  ],
  branches: [
    {
      name: "El Paracao",
      address: "Av. de las Américas 3196, Paraná, Entre Ríos",
      lat: -31.7463,
      lng: -60.5116,
    },
    {
      name: "El Paracao 2",
      address: "Almirante Brown 1195, Paraná, Entre Ríos",
      lat: -31.7321,
      lng: -60.5297,
    },
  ],
  social: {
    instagram: "https://www.instagram.com/drugstore_elparacao/",
    facebook: "https://www.facebook.com/profile.php?id=61565241096755",
  },
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
