import { normalizeValues } from "./index"

describe("normalizeValues", () => {
  it("returns a FormData with person fields", () => {
    let values = {
      name: "Foo Bar",
      age: 30,
      gender: "M",
      items: ""
    }

    let formData = new FormData()
    formData.append("person[name]", "Foo Bar")
    formData.append("person[age]", 30)
    formData.append("person[gender]", "M")
    formData.append("items", "")

    expect(normalizeValues(values)).toEqual(formData)
  })

  it("returns a FormData with items field. i.e: ('Water:10;Food:5')", () => {
    let values = {
      name: "Foo Bar",
      age: 30,
      gender: "M",
      items: { Water: 10, Food: 5, Medication: 1 }
    }

    let formData = new FormData()
    formData.append("person[name]", "Foo Bar")
    formData.append("person[age]", 30)
    formData.append("person[gender]", "M")
    formData.append("items", "Water:10;Food:5;Medication:1")

    expect(normalizeValues(values)).toEqual(formData)
  })
})
