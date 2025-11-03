import { useState } from "react";

const DescriptionBox = () => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="my-[80px] mx-[170px]">
      <div className="flex">
        <div
          onClick={() => setActiveTab("description")}
          className={`text-[18px] font-[600] px-[40px] py-[15px] cursor-pointer transition-all ${
            activeTab === "description"
              ? "border-b-4 border-[#ff4141] text-[#ff4141]"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Description
        </div>
        <div
          onClick={() => setActiveTab("shipping")}
          className={`text-[18px] font-[600] px-[40px] py-[15px] cursor-pointer transition-all ${
            activeTab === "shipping"
              ? "border-b-4 border-[#ff4141] text-[#ff4141]"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Shipping & Returns
        </div>
      </div>

      <div className="border border-gray-200 p-[40px] mt-[2px]">
        {activeTab === "description" ? (
          <div className="flex flex-col gap-[25px]">
            <div>
              <h3 className="text-[20px] font-[600] mb-[15px]">
                Product Overview
              </h3>
              <p className="text-gray-700 leading-[1.8]">
                An e-commerce website is an online platform for buying and
                selling products or services, acting as a digital storefront
                that facilitates the entire shopping experience from browsing to
                checkout. These sites include features like product galleries,
                shopping carts, and payment processing.
              </p>
            </div>

            <div>
              <h3 className="text-[20px] font-[600] mb-[15px]">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 leading-[1.8]">
                <li>Premium quality fabric for lasting comfort</li>
                <li>Modern and stylish design suitable for any occasion</li>
                <li>Easy care and machine washable</li>
                <li>Available in multiple sizes for perfect fit</li>
                <li>Durable construction with reinforced stitching</li>
              </ul>
            </div>

            <div>
              <h3 className="text-[20px] font-[600] mb-[15px]">
                Product Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div>
                  <span className="font-[600]">Material:</span> 100% Cotton
                </div>
                <div>
                  <span className="font-[600]">Care:</span> Machine Washable
                </div>
                <div>
                  <span className="font-[600]">Fit:</span> Regular Fit
                </div>
                <div>
                  <span className="font-[600]">Origin:</span> Made in USA
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-[25px]">
            <div>
              <h3 className="text-[20px] font-[600] mb-[15px]">
                Shipping Information
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 leading-[1.8]">
                <li>
                  <span className="font-[600]">Standard Shipping:</span> 5-7
                  business days (Free on orders over $50)
                </li>
                <li>
                  <span className="font-[600]">Express Shipping:</span> 2-3
                  business days ($15.00)
                </li>
                <li>
                  <span className="font-[600]">Overnight Shipping:</span> Next
                  business day ($25.00)
                </li>
                <li>Orders are processed within 1-2 business days</li>
                <li>Tracking information will be provided via email</li>
              </ul>
            </div>

            <div>
              <h3 className="text-[20px] font-[600] mb-[15px]">
                Return Policy
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 leading-[1.8]">
                <li>
                  <span className="font-[600]">30-Day Returns:</span> We accept
                  returns within 30 days of delivery
                </li>
                <li>
                  Items must be unworn, unwashed, and in original condition
                </li>
                <li>Original tags must be attached</li>
                <li>Return shipping is free for exchanges</li>
                <li>Refunds are processed within 5-7 business days</li>
              </ul>
            </div>

            <div>
              <h3 className="text-[20px] font-[600] mb-[15px]">
                Exchange Policy
              </h3>
              <p className="text-gray-700 leading-[1.8]">
                We offer free exchanges for size or color. Simply contact our
                customer service team within 30 days of receiving your order,
                and we'll arrange a prepaid return label for you.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionBox;
