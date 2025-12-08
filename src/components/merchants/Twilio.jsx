"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { getTwilioService, createTwilioService, updateTwilioService } from "@/redux/services/merchants";

export default function Twilio() {
  const dispatch = useDispatch();
  const { twilioData, twilioLoading, merchantsList } = useSelector((state) => state.merchants);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    accountSid: "",
    authToken: "",
    phoneNumber: "",
    status: "ACTIVE"
  });

  useEffect(() => {
    if (selectedMerchant) {
      dispatch(getTwilioService(selectedMerchant));
    }
  }, [dispatch, selectedMerchant]);

  const handleOpenModal = () => {
    if (twilioData) {
      setFormData({
        accountSid: twilioData.accountSid || "",
        authToken: twilioData.authToken || "",
        phoneNumber: twilioData.phoneNumber || "",
        status: twilioData.status || "ACTIVE"
      });
    } else {
      setFormData({
        accountSid: "",
        authToken: "",
        phoneNumber: "",
        status: "ACTIVE"
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      accountSid: "",
      authToken: "",
      phoneNumber: "",
      status: "ACTIVE"
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (twilioData) {
        await dispatch(updateTwilioService({
          merchantCode: selectedMerchant,
          data: formData,
          id: twilioData?.id
        })).unwrap();
        toast.success("تم تحديث بيانات Twilio بنجاح");
      } else {
        await dispatch(createTwilioService({
          merchantCode: selectedMerchant,
          data: formData,
          
        })).unwrap();
        toast.success("تم إضافة بيانات Twilio بنجاح");
      }
      handleCloseModal();
      dispatch(getTwilioService(selectedMerchant));
    } catch (error) {
      toast.error(error?.message || "حدث خطأ أثناء العملية");
    }
  };

  const filteredMerchants = merchantsList?.filter(merchant =>
    merchant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <div className="position-relative">
            <input
              type="text"
              className="form-control radius-8 ps-40"
              placeholder="ابحث عن متجر..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Icon
              icon="heroicons:magnifying-glass"
              className="position-absolute top-50 start-0 translate-middle-y ms-12 text-primary-light"
              width="20"
            />
          </div>
          <select
            className="form-select radius-8"
            value={selectedMerchant}
            onChange={(e) => setSelectedMerchant(e.target.value)}
          >
            <option value="">اختر المتجر</option>
            {filteredMerchants?.map((merchant) => (
              <option key={merchant.id} value={merchant.code}>
                {merchant.name}
              </option>
            ))}
          </select>
        </div>
        {selectedMerchant && (
          <button
            onClick={handleOpenModal}
            className="btn btn-primary-600 text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
          >
            <Icon icon="ic:baseline-plus" className="icon text-xl line-height-1" />
            {twilioData ? "تعديل بيانات Twilio" : "إضافة بيانات Twilio"}
          </button>
        )}
      </div>

      <div className="card-body p-24">
        {!selectedMerchant ? (
          <div className="text-center text-primary-light">الرجاء اختيار المتجر</div>
        ) : twilioLoading ? (
          <div className="text-center">جاري التحميل...</div>
        ) : twilioData ? (
          <div className="table-responsive">
            <table className="table bordered-table sm-table mb-0">
              <tbody>
                <tr>
                  <th className="text-primary-light">Account SID</th>
                  <td>{twilioData.accountSid}</td>
                </tr>
                <tr>
                  <th className="text-primary-light">Auth Token</th>
                  <td>{twilioData.authToken}</td>
                </tr>
                <tr>
                  <th className="text-primary-light">رقم الهاتف</th>
                  <td>{twilioData.phoneNumber}</td>
                </tr>
                <tr>
                  <th className="text-primary-light">الحالة</th>
                  <td>
                    <span className={`badge ${twilioData.status === "ACTIVE" ? "bg-success" : "bg-danger"}`}>
                      {twilioData.status === "ACTIVE" ? "نشط" : "غير نشط"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-primary-light">لا توجد بيانات Twilio لهذا المتجر</div>
        )}
      </div>

      {/* Add/Edit Modal */}
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
              <h5 className="modal-title">
                {twilioData ? "تعديل بيانات Twilio" : "إضافة بيانات Twilio"}
              </h5>
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
                  <label htmlFor="accountSid" className="form-label fw-semibold text-primary-light text-sm mb-8">
                    Account SID
                  </label>
                  <input
                    type="text"
                    className="form-control radius-8"
                    id="accountSid"
                    name="accountSid"
                    value={formData.accountSid}
                    onChange={handleInputChange}
                    required
                    placeholder="أدخل Account SID"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="authToken" className="form-label fw-semibold text-primary-light text-sm mb-8">
                    Auth Token
                  </label>
                  <input
                    type="text"
                    className="form-control radius-8"
                    id="authToken"
                    name="authToken"
                    value={formData.authToken}
                    onChange={handleInputChange}
                    required
                    placeholder="أدخل Auth Token"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label fw-semibold text-primary-light text-sm mb-8">
                    رقم الهاتف
                  </label>
                  <input
                    type="text"
                    className="form-control radius-8"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="أدخل رقم الهاتف"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label fw-semibold text-primary-light text-sm mb-8">
                    الحالة
                  </label>
                  <select
                    className="form-select radius-8"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="ACTIVE">نشط</option>
                    <option value="INACTIVE">غير نشط</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer" style={{ borderTop: "1px solid #dee2e6", padding: "1rem", display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
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
                  disabled={twilioLoading}
                >
                  {twilioLoading ? (
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