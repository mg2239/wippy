import { Head } from '../components/Head';
import { Page } from '../components/Page';

const ErrorPage = () => {
  return (
    <Page>
      <Head title="404" />
      <div className="text-center">
        <h1 className="mb-2 text-8xl font-bold text-rose-500">404</h1>
        <p className="text-xl">page not found</p>
      </div>
    </Page>
  );
};

export default ErrorPage;
