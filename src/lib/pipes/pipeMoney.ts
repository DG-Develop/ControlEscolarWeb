export const pipeMoney = (value: number) =>{
  const transform = new Intl.NumberFormat('en-US', {
    style: "currency",
    currency: "USD"
  })

  return transform.format(value)
}