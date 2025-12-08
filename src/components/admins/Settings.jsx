import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslation } from "@/utils/useTranslation";

const ProfileSettings = () => {
    const { $t } = useTranslation();

    const [imagePreview, setImagePreview] = useState(
        "assets/images/user-grid/user-grid-img13.png"
    );
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const readURL = (input) => {
        if (input.target.files && input.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(input.target.files[0]);
        }
    };

    return (
        <div className="col-lg-8">
            <div className="card h-100">
                <div className="card-body p-24">
                    <ul
                        className="nav border-gradient-tab nav-pills mb-20 d-inline-flex"
                        id="pills-tab"
                        role="tablist"
                    >
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link d-flex align-items-center px-24 active"
                                id="pills-edit-profile-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-edit-profile"
                                type="button"
                                role="tab"
                                aria-controls="pills-edit-profile"
                                aria-selected="true"
                            >
                                {$t("EditProfile")}
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link d-flex align-items-center px-24"
                                id="pills-change-password-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-change-password"
                                type="button"
                                role="tab"
                                aria-controls="pills-change-password"
                                aria-selected="false"
                            >
                                {$t("ChangePassword")}
                            </button>
                        </li>
                    </ul>

                    <div className="tab-content" id="pills-tabContent">
                        <div
                            className="tab-pane fade show active"
                            id="pills-edit-profile"
                            role="tabpanel"
                            aria-labelledby="pills-edit-profile-tab"
                        >
                            <h6 className="text-md text-primary-light mb-16">
                                {$t("ProfileImage")}
                            </h6>

                            {/* Upload Image Start */}
                            <div className="mb-24 mt-16">
                                <div className="avatar-upload">
                                    <div className="avatar-edit position-absolute bottom-0 end-0 me-24 mt-16 z-1 cursor-pointer">
                                        <input
                                            type="file"
                                            id="imageUpload"
                                            accept=".png, .jpg, .jpeg"
                                            hidden
                                            onChange={readURL}
                                        />
                                        <label
                                            htmlFor="imageUpload"
                                            className="w-32-px h-32-px d-flex justify-content-center align-items-center bg-primary-50 text-primary-600 border border-primary-600 bg-hover-primary-100 text-lg rounded-circle"
                                        >
                                            <Icon icon="solar:camera-outline" className="icon" />
                                        </label>
                                    </div>
                                    <div className="avatar-preview">
                                        <div
                                            id="imagePreview"
                                            style={{
                                                backgroundImage: `url(${imagePreview})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Upload Image End */}

                            <form action='#'>
                                <div className='row'>
                                    <div className='col-sm-6'>
                                        <div className='mb-20'>
                                            <label
                                                htmlFor='name'
                                                className='form-label fw-semibold text-primary-light text-sm mb-8'
                                            >
                                                {$t("FullName")}
                                                <span className='text-danger-600'>*</span>
                                            </label>
                                            <input
                                                type='text'
                                                className='form-control radius-8'
                                                id='name'
                                                placeholder={$t("EnterFullName")}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-sm-6'>
                                        <div className='mb-20'>
                                            <label
                                                htmlFor='email'
                                                className='form-label fw-semibold text-primary-light text-sm mb-8'
                                            >
                                                {$t("Email")}
                                                <span className='text-danger-600'>*</span>
                                            </label>
                                            <input
                                                type='email'
                                                className='form-control radius-8'
                                                id='email'
                                                placeholder={$t("EnterEmailAddress")}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-sm-6'>
                                        <div className='mb-20'>
                                            <label
                                                htmlFor='number'
                                                className='form-label fw-semibold text-primary-light text-sm mb-8'
                                            >
                                                {$t("Phone")}
                                            </label>
                                            <input
                                                type='text'
                                                className='form-control radius-8'
                                                id='number'
                                                placeholder={$t("EnterPhoneNumber")}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-sm-6'>
                                        <div className='mb-20'>
                                            <label
                                                htmlFor='depart'
                                                className='form-label fw-semibold text-primary-light text-sm mb-8'
                                            >
                                                {$t("Department")}
                                                <span className='text-danger-600'>*</span>
                                            </label>
                                            <select
                                                className='form-control radius-8 form-select'
                                                id='depart'
                                                defaultValue=''
                                            >
                                                <option value='' disabled>
                                                    {$t("SelectDepartment")}
                                                </option>
                                                <option value='department1'>{$t("Department1")}</option>
                                                <option value='department2'>{$t("Department2")}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-sm-6'>
                                        <div className='mb-20'>
                                            <label
                                                htmlFor='desig'
                                                className='form-label fw-semibold text-primary-light text-sm mb-8'
                                            >
                                                {$t("Designation")}
                                                <span className='text-danger-600'>*</span>
                                            </label>
                                            <select
                                                className='form-control radius-8 form-select'
                                                id='desig'
                                                defaultValue=''
                                            >
                                                <option value='' disabled>
                                                    {$t("SelectDesignation")}
                                                </option>
                                                <option value='designation1'>{$t("Designation1")}</option>
                                                <option value='designation2'>{$t("Designation2")}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-sm-6'>
                                        <div className='mb-20'>
                                            <label
                                                htmlFor='Language'
                                                className='form-label fw-semibold text-primary-light text-sm mb-8'
                                            >
                                                {$t("Language")}
                                                <span className='text-danger-600'>*</span>
                                            </label>
                                            <select
                                                className='form-control radius-8 form-select'
                                                id='Language'
                                                defaultValue=''
                                            >
                                                <option value='' disabled>
                                                    {$t("SelectLanguage")}
                                                </option>
                                                <option value='English'>{$t("English")}</option>
                                                <option value='Bangla'>{$t("Bangla")}</option>
                                                <option value='Hindi'>{$t("Hindi")}</option>
                                                <option value='Arabic'>{$t("Arabic")}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-sm-12'>
                                        <div className='mb-20'>
                                            <label
                                                htmlFor='desc'
                                                className='form-label fw-semibold text-primary-light text-sm mb-8'
                                            >
                                                {$t("Description")}
                                            </label>
                                            <textarea
                                                name='#0'
                                                className='form-control radius-8'
                                                id='desc'
                                                placeholder={$t("WriteDescription")}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-center gap-3'>
                                    <button
                                        type='button'
                                        className='border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8'
                                    >
                                        {$t("Cancel")}
                                    </button>
                                    <button
                                        type='button'
                                        className='btn  btn-primary-600 border border-primary-600 text-md px-56 py-12 radius-8'
                                    >
                                        {$t("Save")}
                                    </button>
                                </div>
                            </form>

                        </div>

                        <div
                            className="tab-pane fade"
                            id="pills-change-password"
                            role="tabpanel"
                            aria-labelledby="pills-change-password-tab"
                        >
                            <div className="mb-20">
                                <label
                                    htmlFor="your-password"
                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                >
                                    {$t("NewPassword")} <span className="text-danger-600">*</span>
                                </label>
                                <div className="position-relative">
                                    <input
                                        type={passwordVisible ? "text" : "password"}
                                        className="form-control radius-8"
                                        id="your-password"
                                        placeholder={$t("EnterNewPassword")}
                                    />
                                    <span
                                        className={`toggle-password ${passwordVisible ? "ri-eye-off-line" : "ri-eye-line"
                                            } cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                                        onClick={togglePasswordVisibility}
                                    ></span>
                                </div>
                            </div>

                            <div className="mb-20">
                                <label
                                    htmlFor="confirm-password"
                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                >
                                    {$t("ConfirmPassword")}{" "}
                                    <span className="text-danger-600">*</span>
                                </label>
                                <div className="position-relative">
                                    <input
                                        type={confirmPasswordVisible ? "text" : "password"}
                                        className="form-control radius-8"
                                        id="confirm-password"
                                        placeholder={$t("EnterConfirmPassword")}
                                    />
                                    <span
                                        className={`toggle-password ${confirmPasswordVisible
                                            ? "ri-eye-off-line"
                                            : "ri-eye-line"
                                            } cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                                        onClick={toggleConfirmPasswordVisibility}
                                    ></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
