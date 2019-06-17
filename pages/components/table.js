export const Table = ({ selectedNumbers }) => {
  let number = 1;

  let columns = [];
  for (let i = 0; i < 10; i++) {
    let rows = [];
    for (let j = 0; j < 10; j++) {
      if (selectedNumbers.includes(number)) {
        rows.push(
          <div style={{ fontSize: 30, color: "red" }}>
            <strike>{number}</strike>
          </div>
        );
      } else
        rows.push(
          <div style={{ fontSize: 30, color: "#d3d3d3" }}>{number}</div>
        );
      number++;
    }
    columns.push(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: 60,
          width: 60
        }}
      >
        {rows}
      </div>
    );
  }
  return <div style={{ display: "flex", flexDirection: "row" }}>{columns}</div>;
};
