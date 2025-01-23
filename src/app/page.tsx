import Header from "@/components/Header";
import Category from "@/components/Category";
import DialogflowChatbot from "@/components/DialogFlowChatbot";
import FeaturedProducts from "@/components/FeaturedProducts";
import Testimonal from "@/components/Testimonal";
import Recommendations from "@/components/Recommendations";
const Page = () => {
  return (
    <div className="bg-gray-800 text-white">
      {/* Header Section */}
      <Header />

      {/* Shop By Category Section */}
      <Category />

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Testimonial Section */}
      <Testimonal />

      {/* Recommendations Section */}
      <div className="bg-white text-black">
        <Recommendations />
      </div>

      {/* Chatbot Section */}
      <DialogflowChatbot />
    </div>
  );
};
export default Page