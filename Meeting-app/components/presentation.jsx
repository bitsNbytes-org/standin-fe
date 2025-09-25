const RenderPresentation = ({ index = 0 }) => {
  const data = [
    {
      heading: 'Welcome to KeyValue Software Systems!',
      bullets: [
        "We're thrilled to have you on board.",
        'This presentation will guide you through a crucial part of your onboarding.',
        'Understanding our Employee Handbook.',
      ],
    },
    {
      heading: 'Keycode presentation',
      bullets: [
        'This presentation will guide you through a crucial part of your onboarding.',
        'Understanding our Employee Handbook.',
        'Learn about our company policies and procedures.',
        'Get familiar with our development workflow.',
        'Understand our code review process.',
      ],
    },
  ];

  // Get the data object at the specified index
  const currentData = data[index];

  // If index is out of bounds, return null or a message
  if (!currentData) {
    return <div>No data available </div>;
  }

  return (
    <div className="presentation-slide">
      <p className="py-5 text-3xl font-bold text-[#52e2a6]">{currentData.heading}</p>
      <ul>
        {currentData.bullets.map((bullet, bulletIndex) => (
          <li key={bulletIndex} className="p-2 text-xl">
            <span className="pr-3 text-[#52e2a6]">•</span>
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RenderPresentation;
