const Button = ({ label, onClick, disabled, outline, small, icon: Icon }) => {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={`
            relative
            disabled:opacity-70
            disabled:cursor-not-allowed
            hover:opacity-80
            transition
            px-4
            w-full
            ${outline ? 'bg-white' : 'bg-gray-400'}
            ${outline ? 'border-black' : 'border-gray-400'}
            ${outline ? 'text-black' : 'text-white'}
            ${small ? 'text-sm' : 'text-md'}
            ${small ? 'py-1' : 'py-3'}
            ${small ? 'font-light' : 'font-semibold'}
            ${small ? 'border-[1px]' : 'border-2'}
          `}
      >
        {Icon && (
          <Icon
            size={24}
            className='
                absolute
                left-4
                top-3
              '
          />
        )}
        {label}
      </button>
    )
  }
  
  export default Button