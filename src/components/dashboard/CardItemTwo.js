import { Card, CardBody } from '@windmill/react-ui';
import Skeleton from 'react-loading-skeleton';
import { useTranslation } from "react-i18next";

const CardItemTwo = ({
  mode,
  title,
  Icon,
  className,
  price,
  currency,
  cash,
  card,
  credit,
  loading,
  title2,
  subTitle,
  quantity
}) => {
  const { t } = useTranslation()
  return (
    <>
      {loading ? (
        <Skeleton
          count={4}
          height={40}
          className="dark:bg-gray-800 bg-gray-200"
          baseColor={`${mode === 'dark' ? '#010101' : '#f9f9f9'}`}
          highlightColor={`${mode === 'dark' ? '#1a1c23' : '#f8f8f8'} `}
        />
      ) : (
        <>
          <Card className={`flex justify-center h-full`}>
            <CardBody className={`border border-gray-200 justify-between dark:border-gray-800 w-full p-6 rounded-lg ${className}`}>
              <div className="text-center xl:mb-0 mb-3">
                <div
                  className={`text-center inline-block text-3xl mb-2 ${className}`}
                >
                  <Icon />
                </div>
                <div>
                  <p className="mb-3 text-base font-medium text-gray-50 dark:text-gray-100">
                    {title2 ? t(`${title2}`) : <Skeleton count={1} height={20} />}
                  </p>
                  <p className="text-2xl font-bold leading-none text-gray-50 dark:text-gray-50">
                    {Number(quantity)}
                  </p>
                </div>
                <div className="flex justify-center text-center text-xs font-normal text-gray-50 dark:text-gray-100">
                  <span className="mt-2">{subTitle}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </>
  );
};

export default CardItemTwo;
