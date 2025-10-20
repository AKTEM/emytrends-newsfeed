import { Link } from "react-router-dom";
import { Moon, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const categories = [
  { name: "Latest Headlines", slug: "latest-headlines" },
  { name: "Editor's Picks", slug: "editors-picks" },
  {
    name: "Education",
    slug: "education",
    subcategories: [
      { name: "Academic Updates", slug: "academic-updates" },
      { name: "Exam/Admission", slug: "exam-admission" },
      { name: "Learning/Career Guide", slug: "learning-career-guide" },
      { name: "Migration", slug: "migration" },
      { name: "Scholarships", slug: "scholarships" },
      { name: "Student Life", slug: "student-life" },
    ],
  },
  { name: "Life After Japa", slug: "life-after-japa" },
  {
    name: "More",
    slug: "more",
    subcategories: [
      { name: "Business/Economy", slug: "business-economy" },
      { name: "Finance", slug: "finance" },
      { name: "Vibes N Cruise", slug: "vibes-n-cruise" },
    ],
  },
  { name: "News", slug: "news" },
  { name: "Sports", slug: "sports" },
  { name: "Tech/Gadget", slug: "tech-gadget" },
  { name: "You May Have Missed", slug: "you-may-have-missed" },
];

export const Header = ({ theme, toggleTheme }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-primary">EmyTrends</h1>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {categories.map((category) =>
              category.subcategories ? (
                <NavigationMenuItem key={category.slug}>
                  <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {category.subcategories.map((sub) => (
                        <li key={sub.slug}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={`/category/${sub.slug}`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{sub.name}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={category.slug}>
                  <Link to={`/category/${category.slug}`}>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      {category.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] overflow-y-auto">
              <nav className="flex flex-col space-y-4 mt-8">
                {categories.map((category) => (
                  <div key={category.slug}>
                    <Link
                      to={`/category/${category.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="block px-2 py-2 text-lg font-semibold hover:text-primary transition-colors"
                    >
                      {category.name}
                    </Link>
                    {category.subcategories && (
                      <div className="ml-4 mt-2 space-y-2">
                        {category.subcategories.map((sub) => (
                          <Link
                            key={sub.slug}
                            to={`/category/${sub.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="block px-2 py-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
