const buttons = [
  { id: 1, text: "UX/UI", bgColor: "#fef1d8", color: "#f88f26", link: "" },
  { id: 2, text: "Design", bgColor: "#ebe6ff", color: "#8063ff", link: "" },
  { id: 3, text: "Branding", bgColor: "#ffe2de", color: "#ff8284", link: "" },
  { id: 4, text: "Marketing", bgColor: "#e6f7ff", color: "#3a58fb", link: "" },
  { id: 5, text: "Testing", bgColor: "#f1f8e9", color: "#309309", link: "" },
];

export default function BoardFilter() {
  return (
    <div className="flex items-center gap-3">
      <div>
        <label htmlFor="categories-filter" className="text-sm">
          Filter by:{" "}
        </label>
      </div>
      <div className="flex items-center gap-6">
        <select name="categories-filter" id="categories-filter" className="text-sm cursor-pointer outline-none focus:ring-0 px-2 py-0 border border-slate-200 rounded-md">
          {buttons.map((button) => (
            <option
              key={button.id}
              style={{ backgroundColor: button.bgColor, color: button.color }}
            >
              {button.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}