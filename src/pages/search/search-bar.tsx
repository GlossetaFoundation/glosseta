import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, HStack } from "@chakra-ui/react";
import { useState, SetStateAction } from "react";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router'

const SearchBar = ({ baseWidth, smWidth }: any): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();
  const router = useRouter()

  const handleSearchTermChange = (event: {
    target: { value: SetStateAction<string> };
  }) => setSearchTerm(event.target.value);

  return (
    <>
      <HStack padding={2}>
        <form action="#">
          <fieldset>
            <InputGroup aria-label={t('searchInputGroupAriaLabel')}>
              <InputLeftElement
                className="InputLeft"
                pointerEvents="none"
                size="xs"
              >
                <SearchIcon
                  aria-label={t('searchIconAriaLabel')}
                  className="SearchIcon"
                  color="gray.300"
                />
              </InputLeftElement>
              <Input
                autoComplete={"off"}
                variant="outline"
                aria-label={t('searchInputAriaLabel')}
                backgroundColor="white"
                color="black"
                rounded="lg"
                onChange={handleSearchTermChange}
                width={{ base: baseWidth, sm: smWidth }}
                type="search"
                id="search"
                onClick={(event) => {
                  event.currentTarget.scrollIntoView();
                }}
                onKeyPress={(event) => {
                  if (event.key === "Enter" && searchTerm !== "") {
                    event.preventDefault();
                    router.push(`/search?term=${searchTerm.toLowerCase()}`, );
                  }
                }}
              />
            </InputGroup>
          </fieldset>
        </form>
      </HStack>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default SearchBar;