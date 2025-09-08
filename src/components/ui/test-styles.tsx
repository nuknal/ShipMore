export function TestStyles() {
  return (
    <div className="m-4 rounded-lg bg-primary-500 p-4 text-white shadow-lg">
      <h2 className="mb-2 text-2xl font-bold">Tailwind 样式测试</h2>
      <p className="text-lg">这个组件用于测试 Tailwind CSS 样式是否正确应用。</p>
      <div className="mt-4 flex space-x-4">
        <button className="rounded-md bg-secondary-700 px-4 py-2 text-white transition-colors hover:bg-secondary-800">
          按钮 1
        </button>
        <button className="rounded-md bg-accent-coral px-4 py-2 text-white transition-colors hover:bg-accent-brown">
          按钮 2
        </button>
      </div>
    </div>
  );
}
