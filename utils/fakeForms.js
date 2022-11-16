export default function fakeForms() {
  let result = [];
  for (let i = 1; i < 20; i++) {
    result.push({
      formID: i.toString(),
      title: "fakeForm " + i,
      date: new Date(new Date() - Math.random() * 1e12)
        .toString()
        .split("G")[0],
      respuestas: Math.round(Math.random() * 20),
      schema: {
        title: "fakeForm" + i,
        type: "object",
        properties: {
          title: { type: "string", title: "Title", default: "A new task" },
          done: { type: "boolean", title: "Done?", default: false },
        },
      },
      uiSchema: {
        "ui:order": ["Title", "Done?"],
      },
    });
  }
  return result;
}
