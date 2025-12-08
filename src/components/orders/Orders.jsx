"use client";
import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/utils/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersService, updateOrderStatusService, deleteOrderService } from '@/redux/services/ordersService';
import { getMerchantsListService } from '@/redux/services/merchants';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { getImageUrl } from '@/utils/imageUtils';

import { Icon } from '@iconify/react';
import Pagination from '../common/Pagination';

const Orders = () => {
    const { $t } = useTranslation();
    const dispatch = useDispatch();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [merchantFilter, setMerchantFilter] = useState("");
    const [merchantsList, setMerchantsList] = useState([]);
    const [isLoadingMerchants, setIsLoadingMerchants] = useState(false);
    const itemsPerPage = 10;
   
    const { ordersList, metaData, isLoadingOrders, orderError, isUpdatingOrderStatus, isDeletingOrder } = useSelector((state) => state.orders);
    // No longer dependent on merchant data

    useEffect(() => {
        // Fetch merchants for filter dropdown
        setIsLoadingMerchants(true);
        dispatch(getMerchantsListService({
            page: 0,
            limit: 100,  // Get a large number to populate the dropdown
            status: 'APPROVED' // Only get approved merchants
        }))
        .unwrap()
        .then(response => {
            setMerchantsList(response.content || []);
        })
        .catch(error => {
            console.error('Failed to fetch merchants:', error);
        })
        .finally(() => {
            setIsLoadingMerchants(false);
        });
    }, [dispatch]);
    
    useEffect(() => {
        dispatch(getOrdersService({
            page: currentPage - 1,
            size: itemsPerPage,
            search: searchTerm || undefined,
            merchantId: merchantFilter || undefined
        }));
    }, [dispatch, currentPage, searchTerm, merchantFilter]);

    const handleStatusChange = async (status) => {
        try {
            await dispatch(updateOrderStatusService({ id: selectedOrder.id, status })).unwrap();
            setShowStatusModal(false);
            // Refresh orders after status update
            dispatch(getOrdersService({
                page: currentPage - 1,
                size: itemsPerPage,
                search: searchTerm || undefined,
                merchantId: merchantFilter || undefined
            }));
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };
    
    const handleDeleteOrder = async () => {
        try {
            await dispatch(deleteOrderService(selectedOrder.id)).unwrap();
            setShowDeleteModal(false);
            
            // Check if we need to go to previous page (if this was the last item on the page)
            if (ordersList.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            } else {
                // Refresh current page
                dispatch(getOrdersService({
                    page: currentPage - 1,
                    size: itemsPerPage,
                    search: searchTerm || undefined,
                    merchantId: merchantFilter || undefined
                }));
            }
        } catch (error) {
            console.error('Failed to delete order:', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'PENDING':
                return 'bg-warning';
            case 'SHIPPED':
                return 'bg-info';
            case 'COMPLETED':
                return 'bg-success';
            case 'CANCELED':
                return 'bg-danger';
            case 'NOT_APPLICABLE':
                return 'bg-secondary';
            default:
                return 'bg-primary';
        }
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        const order = selectedOrder;
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${$t('OrderDetails')}  ${order.id}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        color: #333;
                        direction: rtl;
                        border: 1px solid #eee;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                        border-bottom: 2px solid #eee;
                        padding-bottom: 20px;
                    }
                    .order-info {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 30px;
                    }
                    .info-section {
                        flex: 1;
                        padding: 15px;
                    }
                    .info-section h3 {
                        color: #2c3e50;
                        margin-bottom: 15px;
                        font-size: 18px;
                    }
                    .info-item {
                        margin-bottom: 10px;
                        display: flex;
                        align-items: center;
                        
                    }
                    .info-label {
                        font-weight: bold;
                        color: #666;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 20px 0;
                    }
                    th, td {
                        padding: 12px;
                        text-align: center;
                        border-bottom: 1px solid #ddd;
                    }
                    th {
                        background-color: #f8f9fa;
                        font-weight: bold;
                    }
                    .total-section {
                        margin-top: 30px;
                        text-align: right;
                    }
                    .total-row {
                        margin: 5px 0;
                    }
                    .grand-total {
                        font-size: 18px;
                        font-weight: bold;
                        margin-top: 10px;
                        padding-top: 10px;
                        border-top: 2px solid #eee;
                    }
                    .status-badge {
                        display: inline-block;
                        padding: 5px 10px;
                        border-radius: 4px;
                        font-size: 14px;
                        font-weight: bold;
                    }
                    .status-${order.status.toLowerCase()} {
                        background-color: ${getStatusBadgeClass(order.status).replace('bg-', '#')};
                        color: white;
                    }
                    @media print {
                        body {
                            margin: 0;
                            padding: 20px;
                        }
                        .no-print {
                            display: none;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>${$t('OrderDetails')}</h1>
                    <p>${$t('OrderID')}: ${order.id}</p>
                </div>
                
                <div class="order-info">
                    <div class="info-section">
                        <h3>${$t('CustomerInformation')}</h3>
                        <div class="info-item">
                            <span class="info-label">${$t('Name')} : </span> ${order.firstName} ${order.lastName}
                        </div>
                        <div class="info-item">
                            <span class="info-label">${$t('Phone')} : </span> ${order.phone}
                        </div>
                        <div class="info-item">
                            <span class="info-label">${$t('Address')} : </span> ${order.address}
                        </div>
                        <div class="info-item">
                            <span class="info-label">${$t('City')} : </span> ${order.city}
                        </div>
                    </div>
                    
                    <div class="info-section">
                        <h3>${$t('OrderInformation')}</h3>
                        <div class="info-item">
                            <span class="info-label">${$t('Date')} : </span> ${new Date(order.createdDate).toLocaleDateString()}
                        </div>
                        <div class="info-item">
                            <span class="info-label">${$t('Status')} : </span>
                            <span class="status-badge ">${$t(order.status)}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">${$t('PaymentMethod')} : </span> ${$t(order.paymentMethod)}
                        </div>
                    </div>

                    <div class="info-section">
                        <h3>${$t('MerchantInformation')}</h3>
                        ${order.merchant ? `
                            <div class="info-item">
                                <span class="info-label">${$t('Name')} : </span> ${order.merchant.name}
                            </div>
                            <div class="info-item">
                                <span class="info-label">${$t('Phone')} : </span> ${order.merchant.phone || '-'}
                            </div>
                        
                        ` : `
                            <div class="info-item">
                                <span>${$t('NoMerchantInformation')}</span>
                            </div>
                        `}
                    </div>
                </div>

                <h3>${$t('OrderItems')}</h3>
                <table>
                    <thead>
                        <tr>
                            <th>${$t('Item')}</th>
                            <th>${$t('Variation')}</th>
                            <th>${$t('Quantity')}</th>
                            <th>${$t('Price')}</th>
                            <th>${$t('Total')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items.map(item => `
                            <tr>
                                <td>
                                    <div>
                                        <strong>${item.item.name}</strong>
                                        <br>
                                        <small>${item.item.category.name}</small>
                                    </div>
                                </td>
                                <td>
                                    ${item.variation ? `
                                        ${item.variation.colorName ? `
                                            <div style="display: flex; align-items: center; gap: 5px;">
                                                <span>${$t('Color')}:</span>
                                                <span style="display: inline-block; width: 15px; height: 15px; background-color: ${item.variation.colorName}; border-radius: 50%;"></span>
                                                ${item.variation.sizeName ? `<span> ${item.variation.sizeName}</span>` : ''}
                                            </div>
                                        ` : ''}
                                    ` : '-'}
                                </td>
                                <td>${item.quantity}</td>
                                <td>${item.variation ? item.variation.price : item.item.price}</td>
                                <td>${(item.variation ? item.variation.price : item.item.price) * item.quantity}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <div class="total-section">
                    <div class="total-row">
                        <span class="info-label">${$t('Subtotal')}:</span> ${order.total}
                    </div>
                    <div class="total-row">
                        <span class="info-label">${$t('Shipping')}:</span> ${order.shippingAmount}
                    </div>
                    ${order.promoCodeUsed ? `
                        <div class="total-row">
                            <span class="info-label">${$t('PromoCode')}:</span> -${order.promoCodeDiscountAmount}
                        </div>
                    ` : ''}
                    <div class="total-row grand-total">
                        <span class="info-label">${$t('TotalAll')}:</span> ${order.shippingAmount + order.total}
                    </div>
                </div>
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        
        // Wait for images to load before printing
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
    };

    if (isLoadingOrders) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    // if (orderError) {
    //     return (
    //         <div className="alert alert-danger m-3" role="alert">
    //             {$t('ErrorLoadingOrders')}
    //         </div>
    //     );
    // }

    return (
        <div className="h-100 p-0 radius-12 d-flex row">
            <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
                <div className="d-flex align-items-center flex-wrap gap-3">
                    <form className="navbar-search" onSubmit={e => e.preventDefault()}>
                        <input
                            type="text"
                            className="bg-base h-40-px w-auto"
                            name="search"
                            placeholder={$t("Search")}
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <Icon icon="ion:search-outline" className="icon" />
                    </form>
                    <select
                        className="form-select h-40-px"
                        value={merchantFilter}
                        onChange={(e) => {
                            setMerchantFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        disabled={isLoadingMerchants}
                    >
                        <option value="">{$t("AllMerchants")}</option>
                        {merchantsList.map((merchant) => (
                            <option key={merchant.id} value={merchant.id}>
                                {merchant.name}
                            </option>
                        ))}
                    </select>
                </div>
                <h4 className="h4">{$t('Orders')}</h4>
            </div>

            <div className="card-body p-12">
                <div className="table-responsive scroll-sm" style={{ minHeight: '400px' }}>
                    <table className="table bordered-table sm-table mb-0">
                        <thead>
                            <tr>
                                <th scope="col">{$t('OrderID')}</th>
                                <th scope="col">{$t('Customer')}</th>
                                <th scope="col">{$t('Merchant')}</th>
                                <th scope="col">{$t('Total')}</th>
                                <th scope="col">{$t('Status')}</th>
                                <th scope="col">{$t('Date')}</th>
                                <th scope="col" className="text-center">{$t('Action')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersList?.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{`${order.firstName} ${order.lastName}`}</td>
                                    <td>{order.merchant?.name || '-'}</td>
                                    <td>{order.total + order.shippingAmount}</td>
                                    <td>
                                        <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                                            {$t(order.status)}
                                        </span>
                                    </td>
                                    <td>{new Date(order.createdDate).toLocaleDateString()}</td>
                                    <td className="text-center">
                                        <div className="d-flex align-items-center gap-10 justify-content-center">
                                            <button
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    setShowDetailsModal(true);
                                                }}
                                                type="button"
                                                className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                            >
                                                <Icon
                                                    icon="majesticons:eye-line"
                                                    className="icon text-xl"
                                                />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    setShowStatusModal(true);
                                                }}
                                                type="button"
                                                className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                            >
                                                 <Icon icon="lucide:edit" className="menu-icon" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    setShowDeleteModal(true);
                                                }}
                                                type="button"
                                                className="bg-danger-focus text-danger-600 bg-hover-danger-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                            >
                                                <Icon icon="lucide:trash-2" className="menu-icon" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {(!ordersList || ordersList.length === 0) && (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        {$t('NoOrdersFound')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
                <span>
                    {$t("Showing")} {(currentPage - 1) * itemsPerPage + 1}-
                    {ordersList?.length || 0} {"من"} {metaData?.totalElements || 0} {$t("Orders")}
                </span>
                <Pagination
                    currentPage={currentPage}
                    totalPages={metaData?.totalPages || 1}
                    onPageChange={handlePageChange}
                />
            </div>

            {/* Details Modal */}
            <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{$t('OrderDetails')}</Modal.Title>
                    <button 
                        className="btn btn-primary ms-2 d-flex align-items-center gap-2"
                        onClick={handlePrint}
                    >
                        <Icon icon="mdi:printer" className="icon" />
                        {$t('Print')}
                    </button>
                </Modal.Header>
                <Modal.Body>
                    {selectedOrder && (
                        <div id="order-details-content">
                            <div className="row mb-4">
                                <div className="col-md-4">
                                    <h6>{$t('CustomerInformation')}</h6>
                                    <p>{$t('Name')}: {`${selectedOrder.firstName} ${selectedOrder.lastName}`}</p>
                                    <p>{$t('Phone')}: {selectedOrder.phone}</p>
                                    <p>{$t('Address')}: {selectedOrder.address}</p>
                                    <p>{$t('City')}: {selectedOrder.city}</p>
                                </div>
                                <div className="col-md-4">
                                    <h6>{$t('OrderInformation')}</h6>
                                    <p>{$t('OrderID')}: {selectedOrder.id}</p>
                                    <p>{$t('Date')}: {new Date(selectedOrder.createdDate).toLocaleDateString()}</p>
                                    <p>{$t('Status')}: <span className={`badge ${getStatusBadgeClass(selectedOrder.status)}`}>{$t(selectedOrder.status)}</span></p>
                                    <p>{$t('PaymentMethod')}: {$t(selectedOrder.paymentMethod)}</p>
                                </div>
                                <div className="col-md-4">
                                    <h6>{$t('MerchantInformation')}</h6>
                                    {selectedOrder.merchant ? (
                                        <>
                                            <div className="d-flex align-items-center mb-2">
                                                {selectedOrder.merchant.logo && (
                                                    <img 
                                                        src={getImageUrl(selectedOrder.merchant.logo)} 
                                                        alt={selectedOrder.merchant.name} 
                                                        className="me-2 rounded-circle"
                                                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                                    />
                                                )}
                                                <div>
                                                    <p className="mb-0 fw-bold">{selectedOrder.merchant.name}</p>
                                                </div>
                                            </div>
                                            <p>{$t('Phone')}: {selectedOrder.merchant.phone || '-'}</p>
                                          
                                        </>
                                    ) : (
                                        <p>{$t('NoMerchantInformation')}</p>
                                    )}
                                </div>
                            </div>
                            <div className='card'>

                                <div className='card-body'>


                                    <h6>{$t('OrderItems')}</h6>
                                    <div className="table-responsive ">
                                        <table className="table bordered-table sm-table mb-0">
                                            <thead>
                                                <tr>
                                                    <th>{$t('Item')}</th>
                                                    <th>{$t('Variation')}</th>
                                                    <th>{$t('Quantity')}</th>
                                                    <th>{$t('Price')}</th>
                                                    <th>{$t('Total')}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedOrder.items.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img
                                                                    src={getImageUrl(item.item.photo)}
                                                                    alt={item.item.name}
                                                                    className="me-2"
                                                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                                />
                                                                <div>
                                                                    <div>{item.item.name}</div>
                                                                    <small className="text-muted">{item.item.category.name}</small>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {item.variation && (
                                                                <>
                                                                    {item.variation.colorName && <span className="me-2 d-flex align-items-center gap-2 ">{$t('Color')}: <span className=' d-block w-20 h-20 rounded-circle' style={{width: '15px', height: '25px', backgroundColor: item.variation.colorName}}></span> <span> {item.variation.sizeName}</span></span>}
                                                                   
                                                                </>
                                                            )}
                                                        </td>
                                                        <td>{item.quantity}</td>
                                                        <td>{item.variation ? item.variation.price : item.item.price}</td>
                                                        <td>{(item.variation ? item.variation.price : item.item.price) * item.quantity}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>


                                    <div className="row mt-4">
                                        <div className="col-md-6 offset-md-6">
                                            <table className="table bordered-table sm-table mb-0">
                                                <tbody>
                                                    <tr>
                                                        <td>{$t('Subtotal')}</td>
                                                        <td className="text-end">{selectedOrder.total}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{$t('Shipping')}</td>
                                                        <td className="text-end">{selectedOrder.shippingAmount}</td>
                                                    </tr>
                                                    {selectedOrder.promoCodeUsed && (
                                                        <tr>
                                                            <td>{$t('PromoCode')}</td>
                                                            <td className="text-end">-{selectedOrder.promoCodeDiscountAmount}</td>
                                                        </tr>
                                                    )}
                                                    <tr>
                                                        <td><strong>{$t('TotalAll')}</strong></td>
                                                        <td className="text-end"><strong>{selectedOrder.shippingAmount + selectedOrder.total}</strong></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal.Body>
            </Modal>

            {/* Status Update Modal */}
            <Modal show={showStatusModal} onHide={() => setShowStatusModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{$t('UpdateOrderStatus')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>{$t('Status')}</Form.Label>
                            <Form.Select
                                value={selectedOrder?.status}
                                onChange={(e) => handleStatusChange(e.target.value)}
                                disabled={isUpdatingOrderStatus}
                            >
                                <option value="PENDING">{$t('PENDING')}</option>
                                <option value="SHIPPED">{$t('SHIPPED')}</option>
                                <option value="COMPLETED">{$t('COMPLETED')}</option>
                                <option value="CANCELED">{$t('CANCELED')}</option>
                                <option value="NOT_APPLICABLE">{$t('NOT_APPLICABLE')}</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{$t('DeleteOrder')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{$t('DeleteOrderConfirmation')}</p>
                    {selectedOrder && (
                        <div className="alert alert-warning">
                            <p><strong>{$t('OrderID')}:</strong> {selectedOrder.id}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)} disabled={isDeletingOrder}>
                        {$t('Cancel')}
                    </Button>
                    <Button variant="danger" onClick={handleDeleteOrder} disabled={isDeletingOrder}>
                        {isDeletingOrder ? (
                            <>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                                {$t('Deleting')}
                            </>
                        ) : $t('Delete')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Orders; 