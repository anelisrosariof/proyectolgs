export function formatDate(value: string) {
  const iso = value.length > 10 ? value : `${value}T00:00:00`;
  return new Intl.DateTimeFormat("es-DO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}