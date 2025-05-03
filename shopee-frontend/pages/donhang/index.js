import DonHangTable from '../../components/DonHangTable';
import TongGiaTriDonHang from './tong-gia-tri';
import Layout from '../../components/Layout';


export default function Home() {
  return (
    <Layout> 
      <div className="p-8">
        <DonHangTable />
      </div> 
  </Layout>
    
  );
}
