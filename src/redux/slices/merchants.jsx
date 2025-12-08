import { createSlice } from "@reduxjs/toolkit";
import {
  getMerchantsListService,
  getMerchantByIdService,
  getMerchantTypesService,
  createMerchantTypeService,
  updateMerchantTypeService,
  deleteMerchantTypeService,
  getLanguagesListService,
  createLanguageService,
  updateLanguageService,
  deleteLanguageService,
  getMerchantLanguagesService,
  addMerchantLanguageService,
  getTwilioService,
  createTwilioService,
  updateTwilioService,
  getBucketsListService,
  createBucketService,
  deleteBucketService,
  getMerchantProductsService,
  changeMerchantStatusService,
  deleteMerchantService
} from "../services/merchants";

const initialState = {
  merchantsList: null,
  merchantData: null,
  metaData: null,
  isLoading: false,
  error: null,
  isLoadingDelete: false,
  isLoadingStatusChange: false,
  statusChangeError: null,
  statistics: null,
  statisticsLoading: false,
  merchantTypesList: null,
  merchantTypeData: null,
  merchantTypeMetaData: null,
  isLoadingMerchantType: false,
  merchantTypeError: null,
  isLoadingMerchantTypeDelete: false,
  languagesList: [],
  languageLoading: false,
  languageError: null,
  merchantLanguages: [],
  merchantLanguagesLoading: false,
  merchantLanguagesError: null,
  twilioData: null,
  twilioLoading: false,
  twilioError: null,
  bucketsList: [],
  bucketLoading: false,
  bucketError: null,
  merchantProducts: [],
  merchantProductsLoading: false,
  merchantProductsError: null,
};

const merchantsSlice = createSlice({
  name: "merchants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Merchant List
      .addCase(getMerchantsListService.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMerchantsListService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.merchantsList = action.payload.content;
        state.metaData = action.payload;
      })
      .addCase(getMerchantsListService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch merchants";
      })
     
      // Get Merchant by ID
      .addCase(getMerchantByIdService.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMerchantByIdService.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.merchantData = action.payload;
      })
      .addCase(getMerchantByIdService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch merchant";
      })
      
      // Get Merchant Types
      .addCase(getMerchantTypesService.pending, (state) => {
        state.isLoadingMerchantType = true;
        state.merchantTypeError = null;
      })
      .addCase(getMerchantTypesService.fulfilled, (state, action) => {
        state.isLoadingMerchantType = false;
        state.merchantTypesList = action.payload;
        state.merchantTypeMetaData = action.payload;
      })
      .addCase(getMerchantTypesService.rejected, (state, action) => {
        state.isLoadingMerchantType = false;
        state.merchantTypeError = action.payload || "Failed to fetch merchant types";
      })

      // Create Merchant Type
      .addCase(createMerchantTypeService.pending, (state) => {
        state.isLoadingMerchantType = true;
        state.merchantTypeError = null;
      })
      .addCase(createMerchantTypeService.fulfilled, (state) => {
        state.isLoadingMerchantType = false;
      })
      .addCase(createMerchantTypeService.rejected, (state, action) => {
        state.isLoadingMerchantType = false;
        state.merchantTypeError = action.payload || "Failed to add merchant type";
      })

      // Update Merchant Type
      .addCase(updateMerchantTypeService.pending, (state) => {
        state.isLoadingMerchantType = true;
        state.merchantTypeError = null;
      })
      .addCase(updateMerchantTypeService.fulfilled, (state) => {
        state.isLoadingMerchantType = false;
      })
      .addCase(updateMerchantTypeService.rejected, (state, action) => {
        state.isLoadingMerchantType = false;
        state.merchantTypeError = action.payload || "Failed to update merchant type";
      })

      // Delete Merchant Type
      .addCase(deleteMerchantTypeService.pending, (state) => {
        state.isLoadingMerchantTypeDelete = true;
        state.merchantTypeError = null;
      })
      .addCase(deleteMerchantTypeService.fulfilled, (state) => {
        state.isLoadingMerchantTypeDelete = false;
      })
      .addCase(deleteMerchantTypeService.rejected, (state, action) => {
        state.isLoadingMerchantTypeDelete = false;
        state.merchantTypeError = action.payload || "Failed to delete merchant type";
      })
      
      // Get Languages List
      .addCase(getLanguagesListService.pending, (state) => {
        state.languageLoading = true;
        state.languageError = null;
      })
      .addCase(getLanguagesListService.fulfilled, (state, action) => {
        console.log(action.payload);

        state.languageLoading = false;
        state.languagesList = action.payload.content || [];
      })
      .addCase(getLanguagesListService.rejected, (state, action) => {
        state.languageLoading = false;
        state.languageError = action.payload;
      })

      // Create Language
      .addCase(createLanguageService.pending, (state) => {
        state.languageLoading = true;
        state.languageError = null;
      })
      .addCase(createLanguageService.fulfilled, (state, action) => {
        state.languageLoading = false;
        state.languagesList.push(action.payload);
      })
      .addCase(createLanguageService.rejected, (state, action) => {
        state.languageLoading = false;
        state.languageError = action.payload;
      })

      // Update Language
      .addCase(updateLanguageService.pending, (state) => {
        state.languageLoading = true;
        state.languageError = null;
      })
      .addCase(updateLanguageService.fulfilled, (state, action) => {
        state.languageLoading = false;
        const index = state.languagesList.findIndex(lang => lang.id === action.payload.id);
        if (index !== -1) {
          state.languagesList[index] = action.payload;
        }
      })
      .addCase(updateLanguageService.rejected, (state, action) => {
        state.languageLoading = false;
        state.languageError = action.payload;
      })

      // Delete Language
      .addCase(deleteLanguageService.pending, (state) => {
        state.languageLoading = true;
        state.languageError = null;
      })
      .addCase(deleteLanguageService.fulfilled, (state, action) => {
        state.languageLoading = false;
        state.languagesList = state.languagesList.filter(lang => lang.id !== action.payload.id);
      })
      .addCase(deleteLanguageService.rejected, (state, action) => {
        state.languageLoading = false;
        state.languageError = action.payload;
      })

      // Get Merchant Languages
      .addCase(getMerchantLanguagesService.pending, (state) => {
        state.merchantLanguagesLoading = true;
        state.merchantLanguagesError = null;
      })
      .addCase(getMerchantLanguagesService.fulfilled, (state, action) => {
        state.merchantLanguagesLoading = false;
        state.merchantLanguages = action.payload;
      })
      .addCase(getMerchantLanguagesService.rejected, (state, action) => {
        state.merchantLanguagesLoading = false;
        state.merchantLanguagesError = action.payload;
      })

      // Add Merchant Language
      .addCase(addMerchantLanguageService.pending, (state) => {
        state.merchantLanguagesLoading = true;
        state.merchantLanguagesError = null;
      })
      .addCase(addMerchantLanguageService.fulfilled, (state, action) => {
        state.merchantLanguagesLoading = false;
        state.merchantLanguages.push(action.payload);
      })
      .addCase(addMerchantLanguageService.rejected, (state, action) => {
        state.merchantLanguagesLoading = false;
        state.merchantLanguagesError = action.payload;
      })

      // Get Twilio
      .addCase(getTwilioService.pending, (state) => {
        state.twilioLoading = true;
        state.twilioError = null;
      })
      .addCase(getTwilioService.fulfilled, (state, action) => {
        state.twilioLoading = false;
        state.twilioData = action.payload;
      })
      .addCase(getTwilioService.rejected, (state, action) => {
        state.twilioLoading = false;
        state.twilioError = action.payload;
        state.twilioData = null
      })

      // Create Twilio
      .addCase(createTwilioService.pending, (state) => {
        state.twilioLoading = true;
        state.twilioError = null;
      })
      .addCase(createTwilioService.fulfilled, (state, action) => {
        state.twilioLoading = false;
        state.twilioData = action.payload;
      })
      .addCase(createTwilioService.rejected, (state, action) => {
        state.twilioLoading = false;
        state.twilioError = action.payload;
      })

      // Update Twilio
      .addCase(updateTwilioService.pending, (state) => {
        state.twilioLoading = true;
        state.twilioError = null;
      })
      .addCase(updateTwilioService.fulfilled, (state, action) => {
        state.twilioLoading = false;
        state.twilioData = action.payload;
      })
      .addCase(updateTwilioService.rejected, (state, action) => {
        state.twilioLoading = false;
        state.twilioError = action.payload;
      })

      // Get Buckets List
      .addCase(getBucketsListService.pending, (state) => {
        state.bucketLoading = true;
        state.bucketError = null;
      })
      .addCase(getBucketsListService.fulfilled, (state, action) => {
        state.bucketLoading = false;
        state.bucketsList = action.payload.content;
      })
      .addCase(getBucketsListService.rejected, (state, action) => {
        state.bucketLoading = false;
        state.bucketError = action.payload;
      })

      // Create Bucket
      .addCase(createBucketService.pending, (state) => {
        state.bucketLoading = true;
        state.bucketError = null;
      })
      .addCase(createBucketService.fulfilled, (state, action) => {
        state.bucketLoading = false;
        state.bucketsList.push(action.payload);
      })
      .addCase(createBucketService.rejected, (state, action) => {
        state.bucketLoading = false;
        state.bucketError = action.payload;
      })

      // Delete Bucket
      .addCase(deleteBucketService.pending, (state) => {
        state.bucketLoading = true;
        state.bucketError = null;
      })
      .addCase(deleteBucketService.fulfilled, (state, action) => {
        state.bucketLoading = false;
        state.bucketsList = state.bucketsList.filter(bucket => bucket.id !== action.payload.id);
      })
      .addCase(deleteBucketService.rejected, (state, action) => {
        state.bucketLoading = false;
        state.bucketError = action.payload;
      })

      // Change Merchant Status
      .addCase(changeMerchantStatusService.pending, (state) => {
        state.isLoadingStatusChange = true;
        state.statusChangeError = null;
      })
      .addCase(changeMerchantStatusService.fulfilled, (state, action) => {
        state.isLoadingStatusChange = false;
        // Update the merchant status in the list if it exists
        if (state.merchantsList) {
          const merchantIndex = state.merchantsList.findIndex(merchant => merchant.id === action.payload.userId);
          if (merchantIndex !== -1) {
            state.merchantsList[merchantIndex].status = action.payload.status;
          }
        }
      })
      .addCase(changeMerchantStatusService.rejected, (state, action) => {
        state.isLoadingStatusChange = false;
        state.statusChangeError = action.payload || "Failed to change merchant status";
      })

      // Get Merchant Products
      .addCase(getMerchantProductsService.pending, (state) => {
        state.merchantProductsLoading = true;
        state.merchantProductsError = null;
      })
      .addCase(getMerchantProductsService.fulfilled, (state, action) => {
        state.merchantProductsLoading = false;
        state.merchantProducts = action.payload.content;
        state.metaData = action.payload;
      })
      .addCase(getMerchantProductsService.rejected, (state, action) => {
        state.merchantProductsLoading = false;
        state.merchantProductsError = action.payload || "Failed to fetch merchant products";
      })
      
      // Delete Merchant
      .addCase(deleteMerchantService.pending, (state) => {
        state.isLoadingDelete = true;
        state.error = null;
      })
      .addCase(deleteMerchantService.fulfilled, (state, action) => {
        state.isLoadingDelete = false;
     
      })
      .addCase(deleteMerchantService.rejected, (state, action) => {
        state.isLoadingDelete = false;
        state.error = action.payload || "Failed to delete merchant";
      });
  },
});

export default merchantsSlice.reducer;
