export async function deleteProject(id) {
  await fetch(`http://localhost:5000/projects/${id}`, {
    method: "DELETE",
  });
}
export async function editProject(id, title) {
  const res = await fetch(`http://localhost:5000/projects/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      title,
    }),
  });
  return res.json();
}
