import "@testing-library/jest-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { render, screen, waitFor, act } from "@testing-library/react";
import { hospitalInfoService } from "./services/hospitalInfo/hospitalInfoService";
import Providers from "./providers/Providers";

vi.mock("./services/hospitalInfo/hospitalInfoService");

beforeEach(() => {
  vi.resetAllMocks();
});

describe("App component", () => {
  it("renders the SearchAndSort component and HospitalDetailCard component, when hospitalInfoService returns hospitals", async () => {
    hospitalInfoService.findAll = vi.fn().mockResolvedValue([
      {
        id: 1,
        name: "hospital 1",
        city: "seattle",
        state: "wa",
        description: "This is a test hospital",
        hospitalPictures: ["/path/to/image.jpg"],
        status: "active",
      },
    ]);

    render(
      <Providers>
        <App />
      </Providers>
    );

    const searchAndSortElement = screen.getByTestId("search-and-sort-box");
    expect(searchAndSortElement).toBeInTheDocument();

    await waitFor(() => {
      const hospitalDetailCard = screen.getByTestId("hospital-detail-card");
      expect(hospitalDetailCard).toBeInTheDocument();

      const hopitalList = screen.getByTestId("hospital-list");
      expect(hopitalList).toBeInTheDocument();

      const gflMap = screen.getByTestId("gfl-map-box");
      expect(gflMap).toBeInTheDocument();
    });
  });

  it("renders no HospitalDetailCard component, when hospitalInfoService returns no hospitals", async () => {
    hospitalInfoService.findAll = vi.fn().mockResolvedValue([]);
    render(<App />);
    await waitFor(() => {
      const hospitalDetailCard = screen.queryByTestId("hospital-detail-card");
      expect(hospitalDetailCard).not.toBeInTheDocument();
    });
  });
  //   it done

  it("renders as many HospitalCards as the number of hospitals returned by getHospitalInfo", async () => {
    hospitalInfoService.findAll = vi.fn().mockResolvedValue([
      {
        id: 1,
        name: "hospital 1",
        city: "seattle",
        state: "wa",
        description: "This is a test hospital",
        hospitalPictures: ["/path/to/image.jpg"],
        status: "active",
      },
      {
        id: 2,
        name: "hospital 2",
        city: "seattle",
        state: "wa",
        description: "This is a test hospital2",
        hospitalPictures: ["/path/to/image2.jpg"],
        status: "past",
      },
    ]);
    render(
      <Providers>
        <App />
      </Providers>
    );
    await waitFor(() => {
      const hospitalDetailCards = screen.getAllByTestId("hospital-detail-card");
      expect(hospitalDetailCards.length).toEqual(2);
    });
  });
  //it done

  it("updates windowHeight on window resize", () => {
    hospitalInfoService.findAll = vi.fn().mockResolvedValue([
      {
        id: 1,
        name: "hospital 1",
        city: "seattle",
        state: "wa",
        description: "This is a test hospital",
        hospitalPictures: ["/path/to/image.jpg"],
        status: "active",
      },
    ]);
    render(<App />);

    act(() => {
      window.innerHeight = 800;
      window.dispatchEvent(new Event("resize"));
    });
    expect(screen.getByTestId("gfl-map-box")).toHaveStyle({ height: "800px" });
  });
  //it done
});
