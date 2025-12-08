"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { getBucketsListService, createBucketService, deleteBucketService } from "@/redux/services/merchants";

export default function Bucket() {
  const dispatch = useDispatch();
  const { bucketsList, bucketLoading, merchantsList } = useSelector((state) => state.merchants);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState("");
  const [bucketName, setBucketName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getBucketsListService());
  }, [dispatch]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setBucketName("");
    setSelectedMerchant("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bucketName.trim() || !selectedMerchant) {
      toast.error("جميع الحقول مطلوبة");
      return;
    }

    try {
      await dispatch(createBucketService({
        bucketName: bucketName.trim(),
        merchantCode: selectedMerchant
      })).unwrap();
      toast.success("تم إنشاء الحاوية بنجاح");
      handleCloseModal();
      dispatch(getBucketsListService());
    } catch (error) {
      toast.error(error?.message || "حدث خطأ أثناء إنشاء الحاوية");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الحاوية؟")) {
      try {
        await dispatch(deleteBucketService(id)).unwrap();
        toast.success("تم حذف الحاوية بنجاح");
        dispatch(getBucketsListService());
      } catch (error) {
        toast.error(error?.message || "حدث خطأ أثناء حذف الحاوية");
      }
    }
  };

  const filteredBuckets = bucketsList?.filter(bucket =>
    bucket.bucketName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <div className="search-box">
            <input
              type="text"
              className="form-control radius-8"
              placeholder="بحث..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={handleOpenModal}
          className="btn btn-primary-600 text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
        >
          <Icon icon="ic:baseline-plus" className="icon text-xl line-height-1" />
          إضافة حاوية جديدة
        </button>
      </div>

      <div className="card-body p-24">
        {bucketLoading ? (
          <div className="text-center">جاري التحميل...</div>
        ) : filteredBuckets?.length > 0 ? (
          <div className="table-responsive">
            <table className="table bordered-table sm-table mb-0">
              <thead>
                <tr>
                  <th>اسم الحاوية</th>
                  <th>معرف المتجر</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredBuckets.map((bucket) => (
                  <tr key={bucket.id}>
                    <td>{bucket.bucketName}</td>
                    <td>{bucket.merchantId}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(bucket.id)}
                        className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                        <Icon icon="heroicons:trash" className="icon text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center">لا توجد حاويات</div>
        )}
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div 
          className="modal-backdrop" 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999
          }}
          onClick={handleCloseModal}
        >
          <div 
            className="modal-content" 
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              width: "500px",
              maxWidth: "90%",
              maxHeight: "90vh",
              overflow: "auto",
              position: "relative",
              zIndex: 10000
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header" style={{ borderBottom: "1px solid #dee2e6", padding: "1rem" }}>
              <h5 className="modal-title">إضافة حاوية جديدة</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseModal}
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body" style={{ padding: "1rem" }}>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-primary-light text-sm mb-8">
                    المتجر <span className="text-danger-600">*</span>
                  </label>
                  <select
                    className="form-select radius-8"
                    value={selectedMerchant}
                    onChange={(e) => setSelectedMerchant(e.target.value)}
                    required
                  >
                    <option value="">اختر المتجر</option>
                    {merchantsList?.map((merchant) => (
                      <option key={merchant.id} value={merchant.code}>
                        {merchant.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-primary-light text-sm mb-8">
                    اسم الحاوية <span className="text-danger-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control radius-8"
                    value={bucketName}
                    onChange={(e) => setBucketName(e.target.value)}
                    required
                    placeholder="أدخل اسم الحاوية"
                  />
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-end gap-2" style={{ borderTop: "1px solid #dee2e6", padding: "1rem" }}>
                <button
                  type="button"
                  className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-40 py-11 radius-8"
                  onClick={handleCloseModal}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="btn btn-primary-600 border border-primary-600 text-md px-24 py-12 radius-8"
                  disabled={bucketLoading}
                >
                  {bucketLoading ? (
                    <span className="d-flex align-items-center gap-2">
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      جاري الحفظ...
                    </span>
                  ) : (
                    "حفظ"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 