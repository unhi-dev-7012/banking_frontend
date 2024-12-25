import api from "@utils/api";

export interface TableData<Entity> {
  data: Entity[];
  metadata: {
    page: number;
    totalCount: number;
  };
}

type FetchTableDataParams = Record<string, any>;
type TableResponse<T> = {
  data: T[];
  metadata: {
    page: number;
    totalCount: number;
  };
};

export const fetchTableData = async <T>(
  url: string,
  params?: FetchTableDataParams
): Promise<TableResponse<T>> => {
  try {
    const response = await api.get(url, { params });

    return {
      data: response.data,
      metadata: (response as any).metadata,
    };
  } catch (error) {
    console.error("[SERVICES]: ", error);
    throw error;
  }
};
