function ProjectCard({ project, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border rounded p-4 shadow hover:shadow-lg transition"
    >
      <h3 className="text-xl font-bold">{project.name}</h3>
      <p className="text-gray-600">{project.description}</p>
    </div>
  );
}

export default ProjectCard;
