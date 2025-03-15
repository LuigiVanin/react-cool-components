import ThemeSwitch from "./ThemeSwitch"

const Header = () => {
  return (
    <header className="flex justify-between items-center px-4 py-2 fixed top-0 left-0 right-0 bg-background  border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-foreground font-bold">Header</h1>
      <ThemeSwitch />
    </header>
  )
}

export default Header;