export default function MemberCircles({ imgs = [], size, side = "left" }) {
  return (
    <>
      {imgs.map((i, index) => {
        const offset =
          side === "right"
            ? -(imgs.length - 1 - index) * 10
            : index * 10;

        return (
          <div
            key={i.id}
            className="relative overflow-hidden rounded-full border-[1px] border-white bg-white"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              right: `${offset}px`,
            }}
          >
            <img src={i.img} alt={i.name} className="w-full h-full object-cover" />
          </div>
        );
      })}
    </>
  );
}
