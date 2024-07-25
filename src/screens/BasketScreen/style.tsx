import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  totalTxt: {
    fontSize: 18,
    color: '#2A59FE',
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  productName: {
    fontSize: 16,
    color: 'black',
  },
  totalPrice: {
    fontSize: 18,
    color: 'black',
    fontWeight: '700',
  },
  itemTotalPrice: {
    fontSize: 14,
    color: '#2A59FE',
    fontWeight: 'bold',
  },

  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    borderRadius: 3,
    paddingHorizontal: 7,
    alignItems: 'center',
  },
  quantityButton: {
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 10,
  },
  quantityButtonText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    paddingHorizontal: 20,
    color: 'white',
    backgroundColor: '#2A59FE',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#aaa',
  },
  footer: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  productPriceTitle: {
    fontSize: 18,
    color: '#2A59FE',
  },
  priceContainer: {
    width: '100%',
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  summaryContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '700',
  },
});

export default styles;
