async function runWasm() {
  const response = await fetch("game.wasm");
  const bytes = await response.arrayBuffer();
  const result = await WebAssembly.instantiate(bytes);

  // エクスポートされている関数を確認
  console.log("Exports:", result.instance.exports);

  // もし main() があれば実行
  if (result.instance.exports.main) {
    const value = result.instance.exports.main();
    document.getElementById("output").textContent = "main() returned: " + value;
  } else {
    document.getElementById("output").textContent = "No main() function found in wasm";
  }
}
