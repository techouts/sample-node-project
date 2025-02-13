import { useRouter } from 'next/router';
import CustomCampaign from '../components/CustomCampaign';

const Microsite = () => {
    const router = useRouter();
    const { city, store } = router.query;
    return (
        <div>
          <CustomCampaign city={city} store={store} />
        </div>
      );
}

export default Microsite;