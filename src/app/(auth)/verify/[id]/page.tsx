import VerifyPage from "@/components/pages/Auth/VerifyPage";

const Verify = ({ params }: { params: { id: string } }) => {
    return <VerifyPage id={params.id} />;
};

export default Verify;