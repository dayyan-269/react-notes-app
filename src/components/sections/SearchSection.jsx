import Card from '../Card'
import RegularInput from '../inputs/RegularInput'
import PrimaryButton from '../buttons/PrimaryButton'

const SearchSection = ({
  searchKeyword,
  searchInputListener,
  filterListener,
  resetListener,
}) => {
  return (
    <section aria-label="search form">
      <Card className="mt-5 bg-white" headerCaption={'Catalog'}>
        <form method="GET">
          <div className="flex flex-row gap-2">
            <RegularInput
              description="Search"
              isRequired={true}
              className="flex-[10]"
              value={searchKeyword}
              onChange={searchInputListener}
            />
            <PrimaryButton
              onClick={filterListener}
              description={'Search'}
              className="h-fit flex-1 bg-green-600 text-white"
              type={'button'}
            />
            <PrimaryButton
              description={'Reset'}
              className={`border-1 h-fit flex-1 text-white ${
                searchKeyword
                  ? 'cursor-pointer bg-blue-400'
                  : 'cursor-not-allowed bg-gray-600'
              }`}
              disabled={searchKeyword ? false : true}
              onClick={resetListener}
            />
          </div>
        </form>
      </Card>
    </section>
  )
}

export default SearchSection
