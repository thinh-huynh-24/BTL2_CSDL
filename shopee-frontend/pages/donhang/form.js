import Layout from '../../components/Layout';
import DonHangForm from '../../components/DonHangForm';
import DonHangCreate from '../../components/DonHangCreate';

export default function DonHangFormPage() {
  return (
    <Layout>
      <div className='gap-4 p-8 flex flex-warp '>
        
        <DonHangForm />
        <DonHangCreate />
      </div>
      
    </Layout>
  );
}
