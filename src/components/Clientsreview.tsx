const Clientsreview = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">Customer Reviews</h2>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">&quot;Fantastic experience!&quot;</h3>
            <p className="text-lg text-gray-600">
              &quot;The shoes I ordered arrived quickly and fit perfectly. The quality is unmatched. Highly recommend!&quot;
            </p>
            <p className="mt-4 text-gray-500">- Sarah Williams</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">&quot;I love my new sneakers!&quot;</h3>
            <p className="text-lg text-gray-600">
              &quot;Great style and comfort, they’re perfect for running and casual wear. Will buy again.&quot;
            </p>
            <p className="mt-4 text-gray-500">- Mark Taylor</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clientsreview; // Export the Reviews component
