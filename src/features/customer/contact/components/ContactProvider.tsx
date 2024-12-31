import React, { ReactNode, useReducer } from "react";
import { contactReducer } from "../reducer/reducer";
import { ContactContext, defaultState } from "./ContactContext";
import { ContactActionType } from "../reducer/actionType";
import { fetchTableData } from "@services/fetchTableData";
import { Contact } from "../contact.type";
import { message, TablePaginationConfig } from "antd";
import { PaginationParams } from "@constants/tableState";
import { getBanks } from "../services/getBanks";
import { BankInfo } from "@features/admin/reconcile/stores/reconcileStore";

export const ContactProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(contactReducer, defaultState);

  const fetchContact = async (
    banks: BankInfo[],
    pagination: TablePaginationConfig
  ) => {
    try {
      dispatch({ type: ContactActionType.SET_LOADING, payload: true });
      // Destructure pagination from state
      const { pageSize, current } = pagination;

      const response = await fetchTableData<Contact>(
        "api/customer/v1/contact",
        {
          limit: pageSize,
          page: current,
          sort: "createdAt",
          order: "desc",
        }
      );

      const data = response.data.map((datum) => ({
        ...datum,
        bankName: banks.find((bank) => bank.id === datum.bankId)?.name || "",
      }));

      dispatch({
        type: ContactActionType.SET_DATA,
        payload: data,
      });

      dispatch({
        type: ContactActionType.SET_PAGINATION,
        payload: {
          total: response.metadata.totalCount,
        },
      });
    } catch (error) {
      message.error("Rất tiết! Đã có lỗi xảy ra, vui lòng thử lại sau!");
    } finally {
      dispatch({ type: ContactActionType.SET_LOADING, payload: false });
    }
  };

  const setPagination = (pagination: Partial<PaginationParams>) => {
    dispatch({ type: ContactActionType.SET_PAGINATION, payload: pagination });
  };

  const fetchBanks = async (): Promise<BankInfo[]> => {
    try {
      const data = await getBanks();
      dispatch({ type: ContactActionType.SET_BANKS, payload: data });
      return data;
    } catch (err) {
      throw err;
    }
  };

  return (
    <ContactContext.Provider
      value={{
        state,
        dispatch,
        fetchContact,
        setPagination,
        fetchBanks,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
