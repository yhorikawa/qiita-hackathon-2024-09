import type { NextPage } from "next";
import { Menu, Profile } from "#/components/ui";

const Page: NextPage = async () => {
  return (
    <section>
      <div className="py-6 px-4 bg-gray-200">
        <Profile />
      </div>
      <Menu />
    </section>
  );
};

export default Page;
