// HomePage.tsx
import React from "react";
import Container from "@/components/ui/container";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import Billboard from "@/components/ui/billboard";
import BackToTop from "@/components/ui/BacktoTop";
import getBillboard from "@/actions/get-billboard";

// Sample reviews (you can customize these)
const sampleReviews = [
  {
    id: 1,
    content: "Great product! Highly recommended.",
    author: "John Doe",
  },
  {
    id: 2,
    content: "Excellent service and quality.",
    author: "Jane Smith",
  },
  {
    id: 3,
    content: "Loved it! Will buy again.",
    author: "Alex Johnson",
  },
  {
    id: 4,
    content: "Great product! Highly recommended.",
    author: "John Doe",
  },
  {
    id: 5,
    content: "Excellent service and quality.",
    author: "Jane Smith",
  },
  {
    id: 6,
    content: "Loved it! Will buy again.",
    author: "Alex Johnson",
  },
];

const ReviewCard: React.FC<{ review: (typeof sampleReviews)[0] }> = ({
  review,
}) => {
  return (
    <div className="card bg-background border p-5 rounded-full shadow-md">
      <p className="text-primary-">{review.content}</p>
      <div className="text-sm text-primary mt-2">- {review.author}</div>
    </div>
  );
};

const CustomerReviews: React.FC<{ reviews: typeof sampleReviews }> = ({
  reviews,
}) => {
  return (
    <div className="reviews-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

const HomePage: React.FC = async () => {
  const products = await getProducts({ isFeatured: true });

  const billboard = await getBillboard();

  return (
    <Container>
      <div className="space-y-8 pb-10 pt-10">
        <Billboard data={billboard} />

        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
          <h2 className="text-2xl font-semibold">Customer Reviews</h2>
          <CustomerReviews reviews={sampleReviews} />
        </div>
        <BackToTop />
      </div>
    </Container>
  );
};

export default HomePage;
