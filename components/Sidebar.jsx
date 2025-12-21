import FollowUs from "./sidebar/FollowUs";
import SidebarPosts from "./sidebar/SidebarPosts";
import Advertisement from "./sidebar/Advertisement";
import SidebarTabs from "./sidebar/SidebarTabs";
// import Updates from "./sidebar/Updates";
import Categories from "./sidebar/Categories";
import TagCloud from "./sidebar/TagCloud";

export default function Sidebar() {
  return (
    <aside className="space-y-8">
      <FollowUs />
      <SidebarPosts title="Smartphones" />
      <Advertisement />
      <SidebarTabs />
      {/* <Updates /> */}
      <Categories />
      <TagCloud />
    </aside>
  );
}
