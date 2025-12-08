"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMerchantByIdService, getMerchantProductsService } from "@/redux/services/merchants";
import { useParams } from "next/navigation";
import Pagination from "../common/Pagination";

export default function ViewMerchant() {
  const params = useParams();
  const dispatch = useDispatch();
  const { merchantData, isLoading, merchantProducts, merchantProductsLoading, metaData } = useSelector((state) => state.merchants);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    if (params?.id) {
      dispatch(getMerchantByIdService(params?.id));
      fetchProducts();
    }
  }, [dispatch, params?.id, currentPage, searchTerm]);

  const fetchProducts = () => {
    dispatch(getMerchantProductsService({
      merchantId: params?.id,
      page: currentPage - 1,
      limit: itemsPerPage,
      search: searchTerm
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (!params?.id) {
    return <div className="text-center mt-5 text-danger">لم يتم العثور على معرف المتجر في الرابط</div>;
  }

  if (isLoading && !merchantData) {
    return <div className="text-center mt-5">...جاري التحميل</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row mb-4 mt-3">
        <div className="col-12 mb-3">
          <div className="card p-3">
            <div className="text-center mb-4">
              {merchantData?.logo && (
                <img
                  src={`https://us-east-1.linodeobjects.com/fantaza/${merchantData.logo}`}
                  alt={merchantData.name}
                  className="border br-white border-width-2-px w-200-px h-200-px rounded-circle object-fit-cover mb-3"
                />
              )}
              <h4>{merchantData?.name}</h4>
            </div>
            <div className="row">
              <div className="col-md-6">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="text-primary-light">اسم المستخدم</span>
                    <span>{merchantData?.username}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="text-primary-light">رقم الهاتف</span>
                    <span>{merchantData?.phone}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="text-primary-light">نوع المتجر</span>
                    <span>{merchantData?.merchantTypeName || '-'}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="text-primary-light">نسبة الربح</span>
                    <span>{merchantData?.profitPercentage || '-'}%</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="text-primary-light">الربح الإجمالي</span>
                    <span>{merchantData?.totalStoreProfit || '-'} </span>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="text-primary-light">تاريخ الإنشاء</span>
                    <span>{merchantData?.createdDate || '-'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">منتجات المتجر</h5>
           
            </div>
            <div className="card-body">
              {merchantProductsLoading ? (
                <div className="text-center">...جاري تحميل المنتجات</div>
              ) : merchantProducts?.length === 0 ? (
                <div className="text-center">لا توجد منتجات</div>
              ) : (
                <>
                  <div className="row">
                    {merchantProducts?.map((product) => (
                      <div key={product.id} className="col-md-4 col-lg-3 mb-4">
                        <div className="card h-100">
                          {product.photo && (
                            <img
                              src={`https://us-east-1.linodeobjects.com/fantaza/${product.photo}`}
                              alt={product.name}
                              className="card-img-top"
                              style={{ height: "200px", objectFit: "cover" }}
                            />
                          )}
                          <div className="card-body">
                            <h6 className="card-title">{product.name}</h6>
                            <p className="card-text small text-muted">{product.description}</p>
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <span className="text-primary fw-bold">{product.priceAfterDiscount} د.ع</span>
                                {product.priceAfterDiscount < product.price && (
                                  <span className="text-muted text-decoration-line-through ms-2">{product.price} د.ع</span>
                                )}
                              </div>
                              <span className="badge bg-success">{product.quantity} متوفر</span>
                            </div>
                            {product.itemVariations?.length > 0 && (
                              <div className="mt-2">
                                <small className="text-muted">الألوان والأحجام: {product.itemVariations.length}</small>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {metaData && (
                    <div className="mt-4">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={metaData.totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
