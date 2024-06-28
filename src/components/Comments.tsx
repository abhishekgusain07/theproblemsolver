const Comments = ({
    postId
}:{
    postId: number
}) => {
    return (
        <div className="flex items-center">
          {/* <DropdownMenu>
            <DropdownMenuTrigger className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
              sort
              <ChevronDown  className="-mr-1 ml-1 size-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {
                SORT_OPTIONS.map((option) => (
                  <button 
                  key={option.name}
                  className={cn('text-left block w-full  px-4 py-2 text-sm', {
                    'text-gray-900 bg-gray-100':option.value === filter.sort,
                    'text-gray-500': option.value !== filter.sort
                  })}
                  onClick={() => {
                    setFilter((prev) => ({
                      ...prev,
                      sort: option.value
                    }))
                    _debounceSubmit()
                  }}>
                    {option.name}
                  </button>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>
          <button className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
            <Filter className="h-5 w-5" />
          </button> */}
            Comment Drop Down component here
        </div>
    )   
}
export default Comments