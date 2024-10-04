import Image from 'next/image';

export default function page() {
  return (
    <div className="bg-gray-400 min-h-screen">
      <div className="sm:p-6">
        <div className="mt-1 mb-4">
          <a className="btn btn-sm btn-primary text-white" href="">
            Add Cars
          </a>
        </div>
        <div className="grid grid-col-1 ml-1 sm:ml-4 sm:grid-cols-3 gap-4  sm:justify-items-center">
          <div className="card w-80 sm:w-96 bg-base-100 shadow-xl sm:mr-4 hover:bg-slate-200">
            <figure className="px-10 pt-10">
              <Image
                src="/mp.png"
                alt="Car image"
                width={200}
                height={200}
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">B 1233 XYZ</h2>
              <p>Merek : Daihatsu</p>
              <p>Merek : Xenia</p>
              <p>Merek : Gray</p>
              <p>Tahun Keluar : 2023</p>
              <div className="card-actions mt-4">
                <a href="#" className="btn btn-xs btn-primary text-white">
                  Details..
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
