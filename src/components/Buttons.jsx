const Buttons = ({ handleColor }) => {
  return (
    <div className="flex items-center justify-between mt-8 border-2 border-indigo-300 rounded shadow-lg p-4">
      <div
        className="w-8 h-8 bg-green-500 rounded ring ring-green-200 cursor-pointer shadow-lg"
        onClick={() => {
          handleColor("green");
        }}
      />
      <div
        className="w-8 h-8 bg-indigo-500 rounded ring ring-indigo-200 cursor-pointer shadow-lg"
        onClick={() => {
          handleColor("indigo");
        }}
      />
      <div
        className="w-8 h-8 bg-red-500 rounded ring ring-red-200 cursor-pointer shadow-lg"
        onClick={() => {
          handleColor("red");
        }}
      />
      <div
        className="w-8 h-8 bg-yellow-500 rounded ring ring-yellow-200 cursor-pointer shadow-lg"
        onClick={() => {
          handleColor("yellow");
        }}
      />
      <div
        className="w-8 h-8 bg-pink-500 rounded ring ring-pink-200 cursor-pointer shadow-lg"
        onClick={() => {
          handleColor("pink");
        }}
      />
      <div
        className="w-8 h-8 bg-gray-500 rounded ring ring-gray-200 cursor-pointer shadow-lg"
        onClick={() => {
          handleColor("gray");
        }}
      />
    </div>
  );
};

export default Buttons;
