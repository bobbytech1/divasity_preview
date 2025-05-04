interface HeaderProps {
    name: string;
    icon?: React.ReactNode;
    containerStyle?: string;
    textStyle?: string;
    iconContainer?: string;
    handlePress?: () => void;
  }
  
  export function TabHeader({
    name,
    icon,
    containerStyle = "",
    textStyle = "",
    iconContainer = "",
    handlePress,
  }: HeaderProps) {
    return (
      <div 
        className={`${containerStyle} bg-green-500 fixed top-0 z-999 flex justify-between px-5 items-center w-full pt-4 pb-4`}
        onClick={handlePress}
      >
        {/* Icon container (fixed width) */}
        <div className={`${iconContainer}`}>
          {icon}
        </div>
        
        {/* Centered text (takes remaining space) */}
        <div className="">
          <h2 className={`${textStyle} text-center font-poppins font-semibold text-[25px]`}>{name}</h2>
        </div>
        
      </div>
    );
  }