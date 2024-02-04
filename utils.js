export function generateElement({
  tag,
  id,
  className,
  value,
  href,
  elementHTML,
  src,
}) {
  const element = document.createElement(tag);

  if (id) element.id = id;
  if (className) element.className = className;
  if (value) element.innerText = value;
  if (elementHTML) element.innerHTML = elementHTML;

  if (tag === "a") element.href = href;
  if (tag === "img") element.src = src;

  return element;
}

export const formatingDate = (dateNow) => {
  const date = new Date(dateNow);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZone: "Asia/Jakarta",
  };

  const formattedDate = new Intl.DateTimeFormat("id-ID", options).format(date);

  return formattedDate;
};
