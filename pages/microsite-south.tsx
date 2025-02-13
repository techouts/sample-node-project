import { useRouter } from 'next/router';
import CampaignSouth from '../components/CustomCampaign/CampaignSouth';

const Microsite = () => {
    const router = useRouter();
    const { city, store } = router.query;
    return (
        <div>
            <CampaignSouth city={city} store={store} />
        </div>
      );
}

export default Microsite;