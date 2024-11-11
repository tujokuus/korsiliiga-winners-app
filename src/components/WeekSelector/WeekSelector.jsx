import React from 'react';

const WeekSelector = ({ selectedWeek, setSelectedWeek }) => {
  const weeks = Array.from({ length: 52 }, (_, i) => i + 1)


  return (
    <div className="week-selector">
      <label htmlFor="week">Valitse viikko:</label>
      <select
        id="week"
        value={selectedWeek}
        onChange={(e) => setSelectedWeek(Number(e.target.value))}
      >
        {weeks.map((week) => (
          <option key={week} value={week}>
            Viikko {week}
          </option>
        ))}
      </select>
    </div>
  );
};

export default WeekSelector;